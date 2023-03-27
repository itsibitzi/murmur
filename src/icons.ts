import { ICON_TYPES } from "@elastic/eui";
import { appendIconComponentCache } from "@elastic/eui/es/components/icon/icon";
import { ValuesType } from "utility-types";

//This feels slightly deranged but apparently Vite doesn't support dynamic imports at all

// Just add icons here as we run into them being missing...

import { icon as arrowDown } from "@elastic/eui/es/components/icon/assets/arrow_down";
import { icon as check } from "@elastic/eui/es/components/icon/assets/check";
import { icon as cross } from "@elastic/eui/es/components/icon/assets/cross";
import { icon as empty } from "@elastic/eui/es/components/icon/assets/empty";

type IconComponentNameType = ValuesType<typeof ICON_TYPES>;
type IconComponentCacheType = Partial<Record<IconComponentNameType, unknown>>;

const cachedIcons: IconComponentCacheType = {
  arrowDown,
  empty,
  cross,
  check,
};

appendIconComponentCache(cachedIcons);
