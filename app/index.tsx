import { createDrawerNavigator } from '@react-navigation/drawer';
import MeuEstoque from "./MeuEstoque";
import MinhasVendas from "./MinhasVendas";

const Drawer = createDrawerNavigator();

export default function Index() {
    

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Meu Estoque" component={MeuEstoque} />
            <Drawer.Screen name="Minhas Vendas" component={MinhasVendas} />
        </Drawer.Navigator>
    );
}
