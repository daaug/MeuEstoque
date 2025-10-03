import { createDrawerNavigator } from '@react-navigation/drawer';
import MeuEstoque from "./meuEstoque";

const Drawer = createDrawerNavigator();

export default function Index() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Meu Estoque" component={MeuEstoque} />
    </Drawer.Navigator>
  );
}
