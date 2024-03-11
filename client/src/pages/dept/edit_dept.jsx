import Layout from "@/components/templates/layout";

export default function EditDept() {
    return (
        <>
    
        </>
    )
}

EditDept.getLayout = function getLayout(page) {
    const getUserByToken = async (token) => {
        try {
            const response = await authService.getUserFromToken(token);
            return response;
        } catch (e) {
            console.log("error", e);
        }
    };
    return <Layout getUserByToken={getUserByToken}>{page}</Layout>;
}