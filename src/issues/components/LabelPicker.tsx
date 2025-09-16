import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useLabelQuery } from "../hooks";

interface Props { 
  onLabelSelected: (label: string) => void;
  selectedLabels : string[];
}

export const LabelPicker = ({onLabelSelected,selectedLabels}: Props) => {

  const { labelsQuery } = useLabelQuery();

  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <LoadingSpinner />
      </div>
    )
  }

  if (!labelsQuery.data) {
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
          key={label.id}
          onClick={() => onLabelSelected(label.name)}
          className={`
            animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer
            ${selectedLabels.includes( label.name) ? 'selected-label' : ""}  
          `}
          style={{ border: `1px solid #${label.color}` }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
