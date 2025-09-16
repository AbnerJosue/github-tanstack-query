import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers";
import { IGithubIssues, State } from "../interfaces"

export const getIssues = async (state: State): Promise<IGithubIssues[]> => {
    await sleep(1500);

    const params = new URLSearchParams();

    if (state !== State.All) {
        params.append("state", state)
    }

    const { data } = await githubApi.get<IGithubIssues[]>("/issues", {
        params,
    });

    return data;
}