import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import "./styles.css";

type Props = { columns: any[] };

export default function ViewButton({ columns }: Props) {
  const column = columns.filter((el) => {
    if (el.id === "title" || el.id === "status" || el.id === "priority") {
      return el.id;
    }
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button radius="small" color="gray" variant="soft">
          <MixerHorizontalIcon />
          View
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color="gray" variant="soft" highContrast>
        <Text align={"center"} as="label" size="2">
          Toggle columns
        </Text>
        <DropdownMenu.Separator />
        {column.map((column) => (
          <DropdownMenu.Item key={column.id}>
            <div className="input" key={column.id}>
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />
                {column.id}
              </label>
            </div>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
