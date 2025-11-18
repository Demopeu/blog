import { FolderItem } from "../consts/folder";

export const MappedItems = ({items}: {items: FolderItem[]}) => items.map(({ label, Icon }) => (
    <div
      key={label}
      className="flex h-full w-full flex-col items-center justify-start text-center"
    >
      <span className="leading-tight">{label}</span>
      {Icon ? (
        <span className="mt-2 inline h-0 w-full flex-1 md:hidden 2xl:inline">
          <Icon className="mx-auto h-full w-auto max-w-10" />
        </span>
      ) : null}
    </div>
  ));