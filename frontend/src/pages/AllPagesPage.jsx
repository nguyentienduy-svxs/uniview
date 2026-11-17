import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { groupedPages } from '../data/pages'

function AllPagesPage() {
  useEffect(() => {
    document.title = 'Tất cả giao diện | UniView'
  }, [])

  return (
    <main className="min-h-screen bg-[#f9f9ff] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-3xl">
          <span className="rounded-full bg-[#fff1f2] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#a93349]">
            31 giao diện từ Google Stitch
          </span>
          <h1 className="mt-6 font-['Epilogue'] text-4xl font-extrabold tracking-tight text-[#172033] md:text-6xl">
            Toàn bộ hành trình UniView
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#667085]">
            Mỗi thẻ mở một route React độc lập, cùng sử dụng Header, Footer, theme và hệ thống điều hướng chung của landing page chính thức.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          {Object.entries(groupedPages).map(([group, items]) => (
            <section key={group}>
              <div className="mb-5 flex items-center gap-3">
                <h2 className="font-['Epilogue'] text-2xl font-bold text-[#172033]">{group}</h2>
                <span className="rounded-full bg-[#dce1ff] px-2.5 py-1 text-xs font-bold text-[#0037b0]">{items.length}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((page) => (
                  <Link
                    key={page.id}
                    to={page.path}
                    className="group rounded-3xl border border-[#172033]/[0.06] bg-white p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] transition-all hover:-translate-y-1 hover:border-[#1d4ed8]/20 hover:shadow-[0_16px_32px_-4px_rgba(29,78,216,0.12)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#a93349]">{group}</p>
                        <h3 className="mt-2 font-['Epilogue'] text-lg font-bold leading-6 text-[#172033]">{page.shortTitle}</h3>
                      </div>
                      <span className="material-symbols-outlined rounded-full bg-[#eff6ff] p-2 text-[#1d4ed8] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </div>
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#667085]">{page.title}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

export default AllPagesPage
