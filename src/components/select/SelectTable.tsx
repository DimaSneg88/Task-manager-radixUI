import {
  Cross1Icon,
  MagnifyingGlassIcon,
  PlusCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Checkbox,
  DropdownMenu,
  Flex,
  Grid,
  Text,
  TextField,
} from "@radix-ui/themes";
import { priorities, statuses } from "../../data/Data";
import { Table } from "@tanstack/react-table";
import { Task } from "../myTable/makeData";

type Props = {
  table: Table<Task>;
};

export default function SelectTable({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const statusColumn = table.getColumn("status");
  const statusSelectedValues = new Set(
    statusColumn?.getFilterValue() as string[]
  );

  const priorityColumn = table.getColumn("priority");
  const prioritySelectedValues = new Set(
    priorityColumn?.getFilterValue() as string[]
  );

  return (
    <Grid columns="3" gap="3" display="inline-grid">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button radius="small" color="gray" variant="soft">
            <PlusCircledIcon />
            Status
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content color="gray" variant="soft" highContrast>
          <TextField.Root radius="small" placeholder="Status">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          {statuses.map((elem) => {
            const isSelected = statusSelectedValues.has(elem.value);
            return (
              <DropdownMenu.Item>
                <Text as="label" size="2">
                  <Flex align={"center"} gap="2">
                    <Checkbox
                      key={elem.value}
                      checked={isSelected}
                      onCheckedChange={() => {
                        if (isSelected) {
                          statusSelectedValues.delete(elem.value);
                        } else {
                          statusSelectedValues.add(elem.value);
                        }
                        const filterValues = Array.from(statusSelectedValues);
                        statusColumn?.setFilterValue(
                          filterValues.length ? filterValues : undefined
                        );
                      }}
                    />
                    <QuestionMarkCircledIcon />
                    {elem.label}
                  </Flex>
                </Text>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button radius="small" color="gray" variant="soft">
            <PlusCircledIcon />
            Priority
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content color="gray" variant="soft" highContrast>
          <TextField.Root radius="small" placeholder="Priority">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          {priorities.map((elem) => {
            const isSelected = prioritySelectedValues.has(elem.value);
            return (
              <DropdownMenu.Item>
                <Text as="label" size="2">
                  <Flex align={"center"} gap="2">
                    <Checkbox
                      key={elem.value}
                      checked={isSelected}
                      onCheckedChange={() => {
                        if (isSelected) {
                          prioritySelectedValues.delete(elem.value);
                        } else {
                          prioritySelectedValues.add(elem.value);
                        }
                        const filterValues = Array.from(prioritySelectedValues);
                        priorityColumn?.setFilterValue(
                          filterValues.length ? filterValues : undefined
                        );
                      }}
                    />
                    <QuestionMarkCircledIcon />
                    {elem.label}
                  </Flex>
                </Text>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {isFiltered && (
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
          color="gray"
        >
          Reset
          <Cross1Icon />
        </Button>
      )}
    </Grid>
  );
}
