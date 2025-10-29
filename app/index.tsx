import { createDrawerNavigator } from '@react-navigation/drawer';
import MeuEstoque from "./MeuEstoque";
import MinhasVendas from "./MinhasVendas";
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

const Drawer = createDrawerNavigator();

export default function Index() {

	useEffect(() => {
		NavigationBar.setVisibilityAsync('hidden');
	});
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Meu Estoque" component={MeuEstoque} />
            <Drawer.Screen name="Minhas Vendas" component={MinhasVendas} />
        </Drawer.Navigator>
    );
}
