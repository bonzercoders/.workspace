import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

function App() {
  return (
    <main className="min-h-screen bg-[#111319] p-4 text-[#e5e5e5] md:p-8">
      <section className="mx-auto max-w-[1800px] rounded-xl border border-[#2c2f36] bg-gradient-to-r from-[#191b1f] to-[#1a1f2b] p-6 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
        <h1 className="text-[30px] font-semibold leading-none">Buttons</h1>

        <div className="mt-6 border-t border-[#333333] pt-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            <div className="flex flex-col items-start gap-3">
              <p className="text-[13px] font-medium text-[#a0a0a0]">Primary Button</p>
              <Button variant="primary" className="font-semibold">
                Generate
              </Button>
            </div>

            <div className="flex flex-col items-start gap-3">
              <p className="text-[13px] font-medium text-[#a0a0a0]">Primary Button (Icon)</p>
              <Button variant="primary" className="font-semibold">
                <Plus className="size-4" />
                New Chat
              </Button>
            </div>

            <div className="flex flex-col items-start gap-3">
              <p className="text-[13px] font-medium text-[#a0a0a0]">Secondary Button</p>
              <Button variant="secondary" className="font-semibold">
                Cancel
              </Button>
            </div>

            <div className="flex flex-col items-start gap-3">
              <p className="text-[13px] font-medium text-[#a0a0a0]">Ghost Button</p>
              <Button variant="ghost" className="font-semibold">
                Learn More
              </Button>
            </div>

            <div className="flex flex-col items-start gap-3">
              <p className="text-[13px] font-medium text-[#a0a0a0]">Icon Button</p>
              <Button variant="icon" size="icon" aria-label="Add new item">
                <Plus className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
