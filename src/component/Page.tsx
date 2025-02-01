import { Footer } from "./Footer";



export const Page = (props: { title?: String, brief?: String, spacing?: Boolean, children?: preact.JSX.Element | preact.JSX.Element[] }) => {
    const { title, brief, spacing, children } = props;

    return (
        <div className="page">
            {(title || brief) && <div className="page__hd">
                {title && <h1 className="page__title"> {title}</h1>}
                {brief && <p className="page__desc">{brief}</p>}
            </div>}
            <div className={`${spacing ? 'page__bd page__bd_spacing' : 'page__bd'}`}>
                {children}
            </div>

            <Footer text="Copyright &copy; 2008-2025 rwsbillyang@qq.com" />
        </div>

    );
}