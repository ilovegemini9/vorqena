import type { KnowledgeRecord } from "../types";

export const printerNotPrinting: KnowledgeRecord = {
  id: "printer-not-printing",
  intent: "fix",
  title: "Printer Not Printing",
  slug: "/fix/printer-not-printing",
  aliases: ["printer won't print", "printer not printing", "printer prints nothing", "print job stuck"],
  answer: "When a printer will not print, check whether the printer is ready, connected, selected as the intended printer, and has paper or consumables. If jobs remain stuck, clear the queue and reconnect the printer before deeper troubleshooting.",
  causes: [
    "Printer offline or disconnected",
    "Wrong printer selected",
    "Paper, ink, toner, or cover error",
    "Stuck print queue",
    "Driver, network, or printer software problem",
  ],
  steps: [
    "Check the printer display or status for paper, cover, cartridge, toner, or connection warnings.",
    "Confirm the intended printer is selected and that it appears online on the computer or phone.",
    "Check paper loading and the printer's consumable status without forcing paper or opening service areas unnecessarily.",
    "Cancel stuck jobs in the print queue, then try one small test print.",
    "For a network printer, confirm the computer and printer are connected to the expected network; for USB, reseat the cable or try another port.",
    "Restart the printer and the device sending the job. If the issue persists, use the printer manufacturer's driver and support guidance.",
  ],
  warnings: [
    "Do not force paper out of a jam if the manufacturer's procedure says otherwise.",
    "Do not open covers or service internal components while the printer is operating.",
    "Stop using the printer if there is smoke, a burning smell, or damaged power wiring.",
  ],
  whenToGetHelp: [
    "The printer reports a hardware fault that basic checks do not clear.",
    "A known-good connection and test print still fail.",
    "The printer repeatedly jams or shows mechanical errors.",
  ],
  factors: [
    "Whether the printer is shown as online",
    "Whether a test page prints directly from the printer",
    "Whether jobs are stuck in the queue",
    "Whether the connection is USB or network-based",
  ],
  sources: [
    { label: "Microsoft Support — Fix printer connection and printing problems in Windows", url: "https://support.microsoft.com/windows/fix-printer-connection-and-printing-problems-in-windows-9d6b3c5f-7f5b-4b9d-a3f6-4b5b4f2f5a5f" },
    { label: "Apple Support — Solve printing problems on Mac", url: "https://support.apple.com/guide/mac-help/solve-printing-problems-mh1401/mac" },
  ],
  related: ["/fix/wifi-not-working", "/fix/laptop-wont-turn-on"],
  seo: { indexable: true, title: "Printer Not Printing: Causes & Fixes | Vorqena", description: "Troubleshoot a printer that will not print with checks for status, connection, paper, queue, drivers, and hardware faults." }
};
