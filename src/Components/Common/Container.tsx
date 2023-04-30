//Interface
interface Props {
    children: React.ReactNode,
    className?: string;
}

const Container = ({ children, className }: Props) => {
    return (
        <div className={`xl:container xl:mx-auto px-28 xl:px-28 lg:px-16 md:px-10 xxs:px-6  ${className}`}>
            {children}
        </div>
    );
};

export default Container;