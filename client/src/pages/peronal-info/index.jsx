import PersonalTable from "@/components/components/personal_table";
import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import { Fragment } from "react";

export default function PersonalInfo() {
    return (
        <Fragment>
            <div className="personal-contrianer">
                <PersonalTable></PersonalTable>
            </div>

        </Fragment>
    )
}


PersonalInfo.getLayout = function getLayout(page) {
    const getUserByToken = async (token) => {
        try {
            const response = await authService.getUserFromToken(token);
            return response;
        } catch (e) {
            console.log("error", e);
        }
    };
    return <Layout getUserByToken={getUserByToken}>{page}</Layout>;
};
