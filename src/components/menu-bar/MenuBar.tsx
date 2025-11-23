import * as Menubar from "@radix-ui/react-menubar";
import "./styles.css";
import { Link } from "react-router-dom";
import { Flex, Switch, Text } from "@radix-ui/themes";
type Props = {
  toggleTheme: () => void;
};

const MenubarDemo = ({ toggleTheme }: Props) => {
  return (
    <Menubar.Root className="MenubarRoot">
      <Flex>
        <Menubar.Menu>
          <Link to={"/"}>
            <Menubar.Trigger className="MenubarTrigger">Home</Menubar.Trigger>
          </Link>
        </Menubar.Menu>

        <Menubar.Menu>
          <Link to={"/task-manager"}>
            <Menubar.Trigger className="MenubarTrigger">
              Task Manager
            </Menubar.Trigger>
          </Link>
        </Menubar.Menu>

        <Menubar.Menu>
          <Link to={"/contact"}>
            <Menubar.Trigger className="MenubarTrigger">
              Contact
            </Menubar.Trigger>
          </Link>
        </Menubar.Menu>
      </Flex>

      <Flex align={"center"} gap={"2"}>
        <Text weight={"medium"}>Dark mode</Text>
        <Switch onClick={toggleTheme} />
      </Flex>
    </Menubar.Root>
  );
};

export default MenubarDemo;
