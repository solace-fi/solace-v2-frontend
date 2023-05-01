import { GetStaticProps } from "next";
import Link from "next/link";

export const getStaticPaths = async () => {
    const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const paths = list.map((id) => {
        return {
            params: { id: id },
        };
    });
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id;
    return {
        props: { pool: id },
    };
};

const Pool = ({ pool }: { pool: string }) => {
    return (
        <div>
            <h1>{pool}</h1>
            <Link href={"/"}>
                <h3>Go back home</h3>
            </Link>
        </div>
    );
};

export default Pool;
