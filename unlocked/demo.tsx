"use client"

import * as React from "react"
import GlassFolder, { FolderFile } from "@/components/ui/glass-folder-cards"
import { Sun, Moon, Sparkles, FolderCheck, CheckCircle2 } from "lucide-react"

const NEW_SAMPLE_IMAGES = [
  { name: "3D Motion Render", meta: "MP4 · 14 MB", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80" },
  { name: "Architecture Study", meta: "JPG · 5.1 MB", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
  { name: "Editorial Shoot", meta: "RAW · 18 MB", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
  { name: "Liquid Abstract", meta: "PNG · 7.8 MB", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" },
]

/**
 * Three folders on a dotted desk: milk glass over a long-exposure print with a
 * key that adds files, a plain archive with a menu, and smoked glass over red
 * ink. Hover one to lean its glass toward you, click it to open it.
 */
export default function GlassFolderCardsDemo() {
  const [isDark, setIsDark] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<{ file: FolderFile; folder: string } | null>(null)
  const addCounter = React.useRef(0)

  // Toggle dark mode class on container / root
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return next
    })
  }

  const handleAdd = (files: FolderFile[]): FolderFile => {
    const pick = NEW_SAMPLE_IMAGES[addCounter.current % NEW_SAMPLE_IMAGES.length]
    addCounter.current++
    return {
      name: `${pick.name} #${files.length + 1}`,
      meta: pick.meta,
      image: pick.image,
    }
  }

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden transition-colors duration-500 px-6 py-16 ${
        isDark ? "bg-[#0b0c10] text-[#f0f2f5]" : "bg-[#f8f9fc] text-[#111216]"
      }`}
      style={{ minHeight: "100svh" }}
    >
      {/* Background Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Controls Header */}
      <header className="relative z-30 mb-12 flex w-full max-w-[1180px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Glass Folder Cards</h1>
            <p className="text-xs text-muted-foreground">Physics-driven frosted glass file organizer</p>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark/light theme"
          className="flex h-9 items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium backdrop-blur shadow-sm transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {isDark ? (
            <>
              <Sun className="h-4 w-4 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 text-indigo-600" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </header>

      {/* Main Grid of Glass Folders */}
      <main className="relative z-10 grid max-w-[1180px] grid-cols-1 items-end justify-items-center gap-x-14 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {/* Folder 1: Interactive Add */}
        <div className="flex flex-col items-center">
          <GlassFolder
            label="My Files"
            art="aurora"
            seed={3}
            appearDelay={0}
            tone={isDark ? "dark" : "light"}
            image="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
            onAdd={handleAdd}
            onFileSelect={(file) => setSelectedFile({ file, folder: "My Files" })}
            files={[
              {
                name: "Brand Identity",
                meta: "PNG · 3.4 MB",
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
              },
              { name: "Design System", meta: "Figma · 12 MB", art: "aurora" },
              { name: "Brief.pdf", meta: "PDF · 1.2 MB", art: "ember" },
            ]}
          />
        </div>

        {/* Folder 2: Archives with Menu */}
        <div className="flex flex-col items-center">
          <GlassFolder
            label="Archives"
            art="none"
            action="more"
            labelPlacement="top-left"
            appearDelay={140}
            tone={isDark ? "dark" : "light"}
            onFileSelect={(file) => setSelectedFile({ file, folder: "Archives" })}
            files={[
              {
                name: "Lookbook 2024",
                meta: "38 images",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
              },
              { name: "Invoices", meta: "12 PDFs" },
              {
                name: "Shoot — Lisbon",
                meta: "RAW · 2.1 GB",
                image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
              },
              { name: "Contract.pdf", meta: "PDF · 320 KB" },
            ]}
            menu={[
              { label: "Rename Folder" },
              { label: "Share Archive…" },
              { label: "Move to Trash", danger: true },
            ]}
          />
        </div>

        {/* Folder 3: Smoked Glass */}
        <div className="flex flex-col items-center">
          <GlassFolder
            label="Stills"
            meta="Wed 19 Aug"
            tone="dark"
            art="ember"
            seed={11}
            action="none"
            labelPlacement="top-right"
            appearDelay={280}
            onFileSelect={(file) => setSelectedFile({ file, folder: "Stills" })}
            image="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80"
            files={[
              {
                name: "Night Cinema",
                meta: "64 images",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
              },
              { name: "Color Grading notes", meta: "TXT · 4 KB" },
              { name: "Master Reel v3", meta: "DRX · 18 MB", art: "aurora" },
            ]}
          />
        </div>
      </main>

      {/* Selected File Toast / Inspector */}
      {selectedFile && (
        <div className="relative z-30 mt-10 flex animate-in fade-in slide-in-from-bottom-3 duration-300 items-center gap-3 rounded-full border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-none" />
          <span className="text-xs font-medium">
            Selected <strong className="font-semibold text-foreground">{selectedFile.file.name}</strong> from{" "}
            <em>{selectedFile.folder}</em>
            {selectedFile.file.meta && <span className="text-muted-foreground ml-1.5 font-mono">({selectedFile.file.meta})</span>}
          </span>
          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            className="ml-2 rounded-full p-1 text-xs text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
      )}

      {/* Footer Instructions */}
      <footer className="relative z-10 mt-12 flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        <FolderCheck className="h-3.5 w-3.5" />
        <span>Hover to lean · Click folder to open · + to drop new files</span>
      </footer>
    </div>
  )
}
