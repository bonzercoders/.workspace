import { type ReactNode } from "react"

import sidebarCollapseIcon from "@/assets/sidebar-collapse.png"
import { SIDEBAR_ITEMS, type AppRoute } from "@/lib/navigation"

interface AppLayoutProps {
  children: ReactNode
  currentRoute: AppRoute
  isSidebarCollapsed: boolean
  onNavigate: (route: AppRoute) => void
  onToggleSidebar: () => void
}

export function AppLayout({
  children,
  currentRoute,
  isSidebarCollapsed,
  onNavigate,
  onToggleSidebar,
}: AppLayoutProps) {
  const sidebarClassName = isSidebarCollapsed ? "app-sidebar is-collapsed" : "app-sidebar"

  return (
    <div className="app-root">
      <div className="app-layout">
        <aside className={sidebarClassName}>
          <div className="sidebar__inner">
            <header className="sidebar__header">
              <strong className="sidebar__brand">aiChat</strong>
              <button
                aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="sidebar__toggle"
                onClick={onToggleSidebar}
                type="button"
              >
                <img alt="" aria-hidden="true" src={sidebarCollapseIcon} />
              </button>
            </header>

            <nav aria-label="Main navigation" className="sidebar__nav">
              {SIDEBAR_ITEMS.map((item) => {
                const itemClassName =
                  item.route === currentRoute ? "sidebar-nav__item is-active" : "sidebar-nav__item"

                return (
                  <button
                    aria-current={item.route === currentRoute ? "page" : undefined}
                    aria-label={item.label}
                    className={itemClassName}
                    key={item.route}
                    onClick={() => onNavigate(item.route)}
                    title={isSidebarCollapsed ? item.label : undefined}
                    type="button"
                  >
                    <img alt="" aria-hidden="true" className="sidebar-nav__icon" src={item.icon} />
                    <span className="sidebar-nav__label">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        <main className="app-main-outer">
          <section className="app-main-panel">{children}</section>
        </main>
      </div>
    </div>
  )
}