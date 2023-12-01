import ProtectedRoute from "@/components/ProtectedRoute";

export default function Chat(){
  return(
    <ProtectedRoute>
    <div>
      <h1>Chat</h1>
      {/* Conteúdo da página de chat */}
    </div>
  </ProtectedRoute>
  )
}