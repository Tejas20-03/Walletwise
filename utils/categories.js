import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Heart,
  Film,
  GraduationCap,
  Home,
  Plane,
  Zap,
  Tag,
} from "lucide-react";

export const CATEGORIES = [
  { id: "food",          label: "Food & Dining",  icon: UtensilsCrossed, color: "bg-orange-100 text-orange-600" },
  { id: "transport",     label: "Transport",       icon: Car,             color: "bg-blue-100 text-blue-600"    },
  { id: "shopping",      label: "Shopping",        icon: ShoppingBag,     color: "bg-pink-100 text-pink-600"    },
  { id: "health",        label: "Health",          icon: Heart,           color: "bg-red-100 text-red-600"      },
  { id: "entertainment", label: "Entertainment",   icon: Film,            color: "bg-purple-100 text-purple-600"},
  { id: "education",     label: "Education",       icon: GraduationCap,   color: "bg-indigo-100 text-indigo-600"},
  { id: "home",          label: "Home",            icon: Home,            color: "bg-teal-100 text-teal-600"    },
  { id: "travel",        label: "Travel",          icon: Plane,           color: "bg-sky-100 text-sky-600"      },
  { id: "utilities",     label: "Utilities",       icon: Zap,             color: "bg-yellow-100 text-yellow-600"},
  { id: "other",         label: "Other",           icon: Tag,             color: "bg-slate-100 text-slate-600"  },
];

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES.at(-1);
}
