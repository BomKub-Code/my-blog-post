import { Outlet } from 'react-router-dom'

export default function FrontendLayout() {
  return (
    <div className="mx-auto w-[1126px] max-w-full text-center border-x border-[var(--border)] min-h-[100svh] flex flex-col">
      <Outlet />
    </div>
  )
}
