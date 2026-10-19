import type { IconType } from "react-icons";
import {
  IoBarChartOutline,
  IoBusinessOutline,
  IoClipboardOutline,
  IoCubeOutline,
  IoDocumentTextOutline,
  IoKeyOutline,
  IoLocationOutline,
  IoNotificationsOutline,
  IoPricetagsOutline,
  IoPulseOutline,
  IoReceiptOutline,
  IoSwapHorizontalOutline,
  IoWalletOutline,
} from "react-icons/io5";
import type { IconName } from "@/content/features";

/** Ionicons, as the app uses (§10). */
const icons: Record<IconName, IconType> = {
  location: IoLocationOutline,
  clipboard: IoClipboardOutline,
  receipt: IoReceiptOutline,
  wallet: IoWalletOutline,
  swap: IoSwapHorizontalOutline,
  pulse: IoPulseOutline,
  pricetags: IoPricetagsOutline,
  business: IoBusinessOutline,
  notifications: IoNotificationsOutline,
  key: IoKeyOutline,
  document: IoDocumentTextOutline,
  cube: IoCubeOutline,
  "bar-chart": IoBarChartOutline,
};

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} />;
}
