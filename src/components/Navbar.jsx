import { navIcons, navLinks } from "@constants";
import dayjs from "dayjs";

const Navbar = () => {
    return <>
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo image" />
                <p className="font-bold">Hossein Moradi Portfolio</p>
                <ul>
                    {navLinks.map(({ id, name }) => (
                        <li key={ id }>{ name }</li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({id, img}) => (
                        <li key={id}>
                            <img src={img} alt={`img-${id}`} className="icon-hover" />
                        </li>
                    ))}
                </ul>
                <time>{ dayjs().format('ddd MMM D h:mm A') }</time>
            </div>
        </nav>
    </>
}

export default Navbar;
