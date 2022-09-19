import Link from "next/link";

export const Menu: React.FC = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Minhas Vendas</p>
      <ul className="menu-list">
        <MenuItem href="/" label="Home" />
        <MenuItem href="/consultas/produtos" label="Produtos" />
        <MenuItem href="/consultas/clientes" label="Clientes" />
        <MenuItem href="/vendas/nova-venda" label="Vendas" />
        <MenuItem href="/vendas/relatorio-vendas" label="Relatorio" />
        <MenuItem href="/" label="Sair" />
      </ul>
    </aside>
  );
};

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <li>
      <Link href={props.href}>{props.label}</Link>
    </li>
  );
};
