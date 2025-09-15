import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useLabelQuery } from "../hooks";


export const LabelPicker = () => {

  const { labelsQuery } = useLabelQuery();

  if (labelsQuery.isLoading){
    return(
      <div className="flex justify-center items-center h-52">
        <LoadingSpinner />
      </div>
    )
  }

  if( !labelsQuery.data ) {
    return ( 
      <div>
        No se encuentran datos
      </div>
    )
  }


  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data.map((label) => (
        <span
        className="animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
        style={{ border: `1px solid #${label.color}` }}
      >
        {label.name}
      </span>
      ))}
    </div>
  );
};
