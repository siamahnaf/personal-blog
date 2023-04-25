//Interface
interface Props {
    children: React.ReactNode,
    className?: string;
}

const Container = ({ children, className }: Props) => {
    return (
        <div className={`xl:container xl:mx-auto px-28 ${className}`}>
            {children}
        </div>
    );
};

export default Container;