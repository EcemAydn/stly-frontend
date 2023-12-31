import SettingIcon from "@/components/icons/SettingIcon.vue";
import WalletIcon from "@/components/icons/WalletIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";

export default [
  // {
  //   id: 1,
  //   title: 'General',
  //   to: '/settings',
  // },
  {
    id: 2,
    title: 'sidebar.Plans & Pricing',
    to: '/payment/plans',
  },
  {
    id: 3,
    title: 'sidebar.My Plan',
    to: '/payment/plan-details',
  },
  {
    id: 4,
    title: 'sidebar.Sessions',
    to: '/sessions'
  },
  {
    id: 5,
    title: 'sidebar.Account',
    to: '/profile',
  },
  {
    id: 6,
    title: 'sidebar.Settings',
    to: '/settings',
  },
]