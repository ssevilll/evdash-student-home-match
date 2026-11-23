
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAccount } from "./AccountProvider";


const demoNotifications = [
  {
    id: "demo-5",
    title: "Ödəniş vaxtı yaxınlaşır!",
    description:
      "Növbəti kirayə ödənişinin son tarixini unutma! Ətraflı məlumat e-poçt ünvanına göndərilib.",
    detail:
      "Kirayə ödənişinin son tarixi yaxınlaşır. Gecikmənin qarşısını almaq üçün ödənişini vaxtında tamamla. Ödəniş məbləği, son tarix və ödəniş təlimatları qeydiyyatdan keçdiyin e-poçt ünvanına göndərilib. Zəhmət olmasa, e-poçtunu yoxla.",
    time: "5 saat əvvəl",
  },
  {
    id: "demo-1",
    title: "Yeni ev elanı!",
    description:
      "ADA Universitetinə yaxın yeni kirayə mənzil əlavə olundu.",
    detail:
      "ADA Universitetinin yaxınlığında tələbələr üçün yeni kirayə mənzil yayımlandı. Mövcud evləri nəzərdən keçir və sənə uyğun olanı seç.",
    time: "10 dəqiqə əvvəl",
  },
  {
    id: "demo-2",
    title: "İstək siyahındakı ev yeniləndi!",
    description:
      "Bəyəndiyin mənzilin qiyməti yeniləndi. Yeni qiymətə bax!",
    detail:
      "İstək siyahına əlavə etdiyin mənzillərdən birinin qiymətində dəyişiklik var. Yenilənmiş qiyməti və mənzil məlumatlarını yoxlaya bilərsən.",
    time: "30 dəqiqə əvvəl",
  },
  {
    id: "demo-3",
    title: "EvDash-dan xüsusi təklif!",
    description:
      "Premium abunəlik imkanlarını kəşf et və uyğun evləri daha rahat tap.",
    detail:
      "EvDash Premium abunəlik imkanları ilə tanış ol. Mövcud abunəlik seçimlərini nəzərdən keçir və ehtiyaclarına uyğun planı seç.",
    time: "Dünən",
  },
  {
    id: "demo-4",
    title: "Yeni mənzil əlavə olundu",
    description:
      "Nərimanov rayonunda tələbələr üçün yeni kirayə mənzil yayımlandı.",
    detail:
      "Nərimanov rayonunda tələbələr üçün yeni mənzil elanı əlavə edilib. Mənzilin qiyməti, şəkilləri, şəraiti və yaxın universitetlər haqqında məlumatları nəzərdən keçirə bilərsən.",
    time: "2 gün əvvəl",
  },
];


type SelectedNotification = {
  id: string;
  title: string;
  description: string;
  detail: string;
  time: string;
  isDemo: boolean;
};

export function Notifications() {
  const { user } = useAccount();
  const query = useQueryClient();

  const [demoReadIds, setDemoReadIds] = useState<string[]>([]);
  const [selected, setSelected] =
    useState<SelectedNotification | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

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

  const demoUnread = demoNotifications.filter(
    (n) => !demoReadIds.includes(n.id)
  ).length;

  const realUnread = items.filter((n) => !n.is_read).length;
  const unread = demoUnread + realUnread;

  const openDemoNotification = (
    notification: (typeof demoNotifications)[number]
  ) => {
    setDemoReadIds((previous) =>
      previous.includes(notification.id)
        ? previous
        : [...previous, notification.id]
    );

    setSelected({
      ...notification,
      isDemo: true,
    });

    setPopoverOpen(false);
  };

  const openRealNotification = async (
    notification: (typeof items)[number]
  ) => {
    setSelected({
      id: notification.id,
      title: notification.title,
      description: notification.title,
      detail: notification.title,
      time: new Date(notification.created_at).toLocaleString(
        "az-AZ"
      ),
      isDemo: false,
    });

    setPopoverOpen(false);

    if (!notification.is_read && user) {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notification.id)
        .eq("user_id", user.id);

      if (error) {
        toast.error("Bildiriş oxunmuş kimi qeyd edilə bilmədi.");
      } else {
        await query.invalidateQueries({
          queryKey: ["notifications", user.id],
        });
      }
    }
  };

  const markAllAsRead = async () => {
    setDemoReadIds(demoNotifications.map((n) => n.id));

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
    <>
      <Popover
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
      >
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
            {demoNotifications.map((n) => {
              const isRead = demoReadIds.includes(n.id);

              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => openDemoNotification(n)}
                  className={`w-full border-b border-border p-4 text-left transition hover:bg-muted ${
                    isRead ? "" : "bg-primary-soft"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">
                      {n.title}
                    </p>

                    {!isRead && (
                      <span className="size-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {n.description}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {n.time}
                  </p>
                </button>
              );
            })}

            {items.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => void openRealNotification(n)}
                className={`w-full border-b border-border p-4 text-left transition hover:bg-muted ${
                  n.is_read ? "" : "bg-primary-soft"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">
                    {n.title}
                  </p>

                  {!n.is_read && (
                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(n.created_at).toLocaleString(
                    "az-AZ"
                  )}
                </p>
              </button>
            ))}

            {error && (
              <p className="p-4 text-sm text-destructive">
                Real bildirişlər yüklənmədi.
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Notification details popup */}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-w-md rounded-3xl p-7">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {selected.title}
                </DialogTitle>

                <DialogDescription>
                  {selected.time}
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-2xl bg-muted p-4">
                <p className="text-sm leading-relaxed text-foreground">
                  {selected.detail}
                </p>
              </div>

              <Button
                className="h-11 w-full bg-brand"
                onClick={() => setSelected(null)}
              >
                Bağla
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
