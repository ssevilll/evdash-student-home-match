import { queryOptions } from '@tanstack/react-query';
import { getAccount, getConversations } from './account.functions';
export const accountQuery = queryOptions({ queryKey: ['account'], queryFn: () => getAccount() });
export const conversationsQuery = queryOptions({ queryKey: ['conversations'], queryFn: () => getConversations() });
