import { useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions/get-issues.actions"
import { State } from "../interfaces";

interface Props { 
    state: State;
}

export default function useIssues({ state }: Props) {
    const issuesQuery = useQuery({ 
        queryKey: ["issues", { state }],
        queryFn: () => getIssues(state),
    })
    
    return {
        issuesQuery
    }
}
