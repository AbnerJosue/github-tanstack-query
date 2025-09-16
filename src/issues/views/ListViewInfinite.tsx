import { useState } from 'react';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces';
import useIssuesInfinite from '../hooks/useIssuesInfinite';

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setselectedLabels] = useState<string[]>([]);

  const { issuesInfiniteQuery } = useIssuesInfinite({
    state: state,
    selectedLabels: selectedLabels
  });

  const issues = issuesInfiniteQuery.data?.pages.flat() ?? [];
  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setselectedLabels(selectedLabels.filter((l) => l !== label))
    } else {
      setselectedLabels([...selectedLabels, label])
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {
          issuesInfiniteQuery.isLoading ?
            <LoadingSpinner /> : (
              <div className='flex flex-col justify-center'>
                <IssueList onStateChange={setState} state={state} issues={issues} />
                  <button 
                    disabled={issuesInfiniteQuery.isFetchingNextPage}
                    onClick={() => issuesInfiniteQuery.fetchNextPage()} className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:bg-gray-500'>
                    {
                      issuesInfiniteQuery.isFetchingNextPage ? ( 
                        <span> Cargando mas... </span>
                      ) : ( 
                       <span> Cargar más... </span>
                      )
                    }
                  </button>
              </div>
            )
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
