import { useRef } from 'react'

export default function HtmlReportFrame({ fullViewport = false, html, title, onAction, onReady }) {
  const frameRef = useRef(null)

  const handleLoad = () => {
    const frame = frameRef.current
    const document = frame?.contentDocument
    const frameWindow = frame?.contentWindow
    if (!document || !frameWindow) return

    document.title = title
    onReady?.(document, frameWindow)

    document.addEventListener('click', (event) => {
      const element = event.target.closest('button, a, [data-report-major-code]')
      if (!element) return
      const handled = onAction?.({
        document,
        element,
        event,
        frameWindow,
        label: element.textContent?.replace(/\s+/g, ' ').trim() ?? '',
        onclick: element.getAttribute('onclick') ?? '',
      })
      if (!handled) return
      event.preventDefault()
      event.stopImmediatePropagation()
    }, true)
  }

  return (
    <main className={`${fullViewport ? 'h-dvh' : 'h-[calc(100dvh-74px)]'} w-full overflow-hidden bg-[#f9f9ff]`}>
      <iframe
        ref={frameRef}
        className="block h-full w-full border-0 bg-[#f9f9ff]"
        srcDoc={html}
        title={title}
        onLoad={handleLoad}
        sandbox="allow-modals allow-same-origin allow-scripts"
      />
    </main>
  )
}
