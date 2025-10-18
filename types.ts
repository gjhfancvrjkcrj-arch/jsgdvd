
export type Plan = 'free' | 'pro' | 'lifetime';

export interface User {
  email: string;
  plan: Plan;
}
