"use client";

import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Bot, CheckCircle, Phone, XCircle } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { useVapiAssistants } from "../../hooks/use-vapi-data";

export const VapiAssistantsTab = () => {
  const { data: assistants, isLoading } = useVapiAssistants();

  return (
    <div className="border-t bg-background ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-8 py-4">Assistant</TableHead>
            <TableHead className="px-6.5 py-4">Model</TableHead>
            <TableHead className="px-9.5 py-4">First Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-4 text-center text-muted-foreground"
                  >
                    Loading Assistants...
                  </TableCell>
                </TableRow>
              );
            }
            if (assistants.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-4 text-center text-muted-foreground"
                  >
                    No Assistants Configured
                  </TableCell>
                </TableRow>
              );
            }

            return assistants.map((assistant) => (
              <TableRow className="hover:bg-muted/50" key={assistant.id}>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Bot className="size-4 text-muted-foreground" />
                    <span className="font-mono">
                      {assistant.name || "Unnamed Assistant"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm">
                    {assistant.model?.model || "Not Configured"}
                  </span>
                </TableCell>
                <TableCell className=" max-w-xs px-6 py-4 ">
                  <p className="truncate text-muted-foreground text-sm px-3.5 ">
                    {assistant.firstMessage || "No Greeting Configured"}
                  </p>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};
