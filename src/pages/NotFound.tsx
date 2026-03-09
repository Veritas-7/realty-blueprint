import { Link } from "react-router-dom";
import { Home, ClipboardList, Map, CheckSquare } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <span className="text-3xl font-bold text-muted-foreground">404</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">페이지를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/" className="flex items-center gap-2 justify-center px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            <Home className="h-4 w-4" /> 홈으로
          </Link>
          <Link to="/client-brief" className="flex items-center gap-2 justify-center px-4 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
            <ClipboardList className="h-4 w-4" /> Client Brief
          </Link>
          <Link to="/site-blueprint" className="flex items-center gap-2 justify-center px-4 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
            <Map className="h-4 w-4" /> Site Blueprint
          </Link>
          <Link to="/checklist" className="flex items-center gap-2 justify-center px-4 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
            <CheckSquare className="h-4 w-4" /> Checklist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
