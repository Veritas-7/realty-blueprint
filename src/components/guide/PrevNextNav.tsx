import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPrevNext } from "@/data/navigation";

interface PrevNextNavProps {
  currentPath: string;
}

export const PrevNextNav = ({ currentPath }: PrevNextNavProps) => {
  const { prev, next } = getPrevNext(currentPath);

  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
      {prev ? (
        <Link to={prev.path} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span>{prev.title}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link to={next.path} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <span>{next.title}</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : <div />}
    </div>
  );
};
