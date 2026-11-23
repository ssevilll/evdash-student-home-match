
import { Bell, CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useAccount } from "./AccountProvider";

const demoNotifications = [
  {
    id: "demo-1",
    title: "Yeni ev elanı!",
    description:
      "ADA Universitetinə yaxın yeni kirayə mənzil əlavə olundu.",
    time: "10 dəqiqə əvvəl",
  },
  {
    id: "demo-2",
    title: "İstək siyahındakı ev yeniləndi!",
    description:
      "Bəyəndiyin mənzilin qiyməti yeniləndi. Yeni qiymətə bax!",
    time: "30 dəqiqə əvvəl",
  },
  {
    id: "demo-3",
    title: "EvDash-dan xüsusi təklif!",
    description:
      "Premium abunəlik imkanlarını kəşf et və uyğun evləri daha rahat tap.",
    time: "Dünən",
  },
  {
    id: "demo-4",
    title: "Yeni mənzil əlavə olundu",
    description:
      "Nərimanov rayonunda tələbələr üçün yeni kirayə mənzil yayımlandı.",
    time: "2 gün əvvəl",
  },
];

export function Notifications() {
  const { user } = useAccount();
  const query = useQueryClient();

  const [demoRead, setDemoRead] = useState(false);

  const {
    data: items = [],
    error,
  } = useQuery({
    queryKey: ["notifications", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`notifications-${user.id}-${crypto.randomUUID()}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          void query.invalidateQueries({
            queryKey: ["notifications", user.id],
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user?.id, query]);

  const realUnread = items.filter((n) => !n.is_read).length;

  const demoUnread = demoRead ? 0 : demoNotifications.length;

  const unread = realUnread + demoUnread;

  const markAllAsRead = async () => {
    setDemoRead(true);

    if (!user || realUnread === 0) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (error) {
      toast.error(error.message);
    } else {
      await query.invalidateQueries({
        queryKey: ["notifications", user.id],
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full"
          aria-label="Bildirişlər"
          title="Bildirişlər"
        >
          <Bell />

          {unread > 0 && (
            <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 max-w-[90vw] p-0"
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-bold">Bildirişlər</h2>

          <Button
            disabled={!unread}
            size="icon"
            variant="ghost"
            title="Hamısını oxunmuş et"
            aria-label="Hamısını oxunmuş et"
            onClick={markAllAsRead}
          >
            <CheckCheck />
          </Button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {/* Demo notifications */}
          {demoNotifications.map((n) => (
            <div
              key={n.id}
              className={`border-b border-border p-4 ${
                demoRead ? "" : "bg-primary-soft"
              }`}
            >
              <p className="text-sm font-medium">
                {n.title}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {n.description}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {n.time}
              </p>
            </div>
          ))}

          {/* Real Supabase notifications */}
          {items.map((n) => (
            <div
              key={n.id}
              className={`border-b border-border p-4 ${
                n.is_read ? "" : "bg-primary-soft"
              }`}
            >
              <p className="text-sm font-medium">
                {n.title}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(n.created_at).toLocaleDateString(
                  "az-AZ"
                )}
              </p>
            </div>
          ))}

          {error && (
            <p className="p-4 text-sm text-destructive">
              Real bildirişlər yüklənmədi.
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
