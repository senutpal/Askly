"use client";

import { useOrganization } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { type IntegrationId, INTEGRATIONS } from "../../constants";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useState } from "react";
import { createScript } from "../../utils";

export const IntegrationsView = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState("");

  const { organization } = useOrganization();

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization ID not found");
      return;
    }
    const snippet = createScript(integrationId, organization.id);
    setSelectedSnippet(snippet);
    setDialogOpen(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id ?? "");
      toast.success("Copied to Clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Copy");
    }
  };

  return (
    <>
      <IntegrationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={selectedSnippet}
      />
      <div className="flex flex-col  min-h-screen bg-muted p-8">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-semibold">
              Setup & Integrations
            </h1>
            <p>Choose the integration that&apos;s right for you</p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <Label className="w-34" htmlFor="organization-id">
                Organization ID
              </Label>
              <Input
                className="flex-1 bg-background font-mono text-sm"
                disabled
                id="organization-id"
                readOnly
                value={organization?.id || "Undefined"}
              />
              <Button className="gap-2" size="sm" onClick={handleCopy}>
                <Copy className="size-4" />
                Copy
              </Button>
            </div>
          </div>
          <Separator className="my-8" />

          <div className="space-y-6">
            <div className="space-y-1">
              <Label className="text-lg">Integrations</Label>
              <p className="text-sm text-muted-foreground">
                Add the following code to your website to enable the chatbox.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {INTEGRATIONS.map((integration) => (
                <button
                  className="flex items-center gap-4 rounded-lg border bg-background p-4 hover:bg-accent"
                  key={integration.id}
                  type="button"
                  aria-label={`Select ${integration.title} integration`}
                  onClick={() => handleIntegrationClick(integration.id)}
                >
                  <Image
                    alt={integration.title}
                    height={32}
                    width={32}
                    src={integration.icon}
                  />
                  <p>{integration.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const IntegrationDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  snippet: string;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success("Copied to Clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Copy");
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate with your website</DialogTitle>
          <DialogDescription>
            Follow these steps to add the chatbox to your website
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              1. Copy the following code
            </div>
            <div className="group relative">
              <pre className="max-h-[300px] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded-md bg-foreground p-2 font-mono text-secondary text-sm">
                {snippet}
              </pre>
              <Button
                className="absolute bottom-2 right-2 size-5 opacity-0 transition-opacity group-hover:opacity-100"
                size="icon"
                variant="secondary"
                onClick={handleCopy}
              >
                <Copy className="size-3" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              2. Add the code in your page
            </div>
            <p className="text-muted-foreground text-sm">
              Paste the chatbox code above in your page. You can add it in the
              HTML head section.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
