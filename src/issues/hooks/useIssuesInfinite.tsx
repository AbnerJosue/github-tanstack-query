import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions/get-issues.actions"
import { State } from "../interfaces";

interface Props { 
    state: State;
    selectedLabels : string[];
}

export default function useIssuesInfinite({ state, selectedLabels }: Props) {

    const issuesInfiniteQuery = useInfiniteQuery({ 
        queryKey: ["issues", 'infinite',{ state, selectedLabels }],
        queryFn: ({ pageParam, queryKey }) => {

            const [,, args] = queryKey;

            const { state, selectedLabels } = args as Props;


            return getIssues(state, selectedLabels, pageParam)
        },
        staleTime: 1000 * 60,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) =>  lastPage.length > 0 ? pages.length + 1 : undefined
    });

 
    return {
        issuesInfiniteQuery, 
    }
}
