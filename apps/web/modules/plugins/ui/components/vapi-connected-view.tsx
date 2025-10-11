"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Bot, Phone, Settings, UnplugIcon } from "lucide-react";
import Link from "next/link";
import { VapiPhoneNumbersTab } from "./vapi-phone-numbers-tab";
import { VapiAssistantsTab } from "./vapi-assistants-tab";
interface VapiConnectedViewProps {
  onDisconnect: () => void;
}

export const VapiConnectedView = ({ onDisconnect }: VapiConnectedViewProps) => {
  const [activeTab, setActiveTab] = useState("phone-numbers");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                alt="vapi"
                className="rounded-lg object-contain"
                height={48}
                width={48}
                src="/vapi.jpg"
              />
              <div className="space-y-2">
                <CardTitle>Vapi Integration</CardTitle>
                <CardDescription>
                  Manage your phone numbers and AI Assistants
                </CardDescription>
              </div>
            </div>
            <Button onClick={onDisconnect} size="sm" variant="destructive">
              <UnplugIcon /> Disconnect
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className=" flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg border bg-muted">
                <Settings className="size-6 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <CardTitle>Widget Configuration</CardTitle>
                <CardDescription>
                  Setup voice calls for your chat widget
                </CardDescription>
              </div>
            </div>
            <Button asChild>
              <Link href="/customization">
                <Settings />
                Configure
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="overflow-hidden rounded-lg border bg-background">
        <Tabs
          className="gap-0"
          defaultValue="phone-numbers"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="grid h-12 w-full grid-cols-2 p-0">
            <TabsTrigger className="h-full rounded-none" value="phone-numbers">
              <Phone />
              Phone Numbers
            </TabsTrigger>
            <TabsTrigger className="h-full rounded-none" value="assistants">
              <Bot />
              AI Assistants
            </TabsTrigger>
          </TabsList>
          <TabsContent value="phone-numbers">
            <VapiPhoneNumbersTab />
          </TabsContent>
          <TabsContent value="assistants">
            <VapiAssistantsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
