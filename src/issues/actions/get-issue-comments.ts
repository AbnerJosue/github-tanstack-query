import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers";
import { IGithubIssues } from "../interfaces"

export const getIssueComments = async (issueNumber: number): Promise<IGithubIssues[]> => {
    await sleep(1500);

    const { data } = await githubApi.get<IGithubIssues[]>(`/issues/${issueNumber}/comments`);

    return data;
}