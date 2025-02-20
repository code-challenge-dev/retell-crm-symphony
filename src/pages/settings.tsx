
import { useState } from 'react';
import { Settings, Volume2, MessageSquare, Phone, Globe, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  
  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-gray-500" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-8">
        <Accordion type="single" collapsible>
          <AccordionItem value="voice">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Voice Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="p-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Default Voice Speed</Label>
                    <Input type="range" min="0.5" max="2" step="0.1" defaultValue="1" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Default Voice Temperature</Label>
                    <Input type="range" min="0" max="2" step="0.1" defaultValue="1" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Default Volume</Label>
                    <Input type="range" min="0" max="2" step="0.1" defaultValue="1" />
                  </div>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="conversation">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversation Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="p-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Responsiveness</Label>
                    <Input type="range" min="0" max="1" step="0.1" defaultValue="1" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Interruption Sensitivity</Label>
                    <Input type="range" min="0" max="1" step="0.1" defaultValue="1" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es-ES">Spanish (Spain)</SelectItem>
                        <SelectItem value="fr-FR">French</SelectItem>
                        <SelectItem value="de-DE">German</SelectItem>
                        <SelectItem value="it-IT">Italian</SelectItem>
                        <SelectItem value="pt-BR">Portuguese (Brazil)</SelectItem>
                        <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                        <SelectItem value="ja-JP">Japanese</SelectItem>
                        <SelectItem value="ko-KR">Korean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="call">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="p-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Max Call Duration (minutes)</Label>
                    <Input type="number" min="1" max="120" defaultValue="60" />
                  </div>
                  <div className="grid gap-2">
                    <Label>End Call After Silence (seconds)</Label>
                    <Input type="number" min="10" max="300" defaultValue="60" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Voicemail Detection</Label>
                    <div className="flex items-center gap-4">
                      <Button variant="outline">Enable</Button>
                      <Button variant="outline">Disable</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="webhooks">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Webhook Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="p-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Webhook URL</Label>
                    <Input type="url" placeholder="https://your-webhook-url.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Webhook Events</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline">Call Started</Button>
                      <Button variant="outline">Call Ended</Button>
                      <Button variant="outline">Call Analysis</Button>
                      <Button variant="outline">Error Events</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="security">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="p-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>API Key</Label>
                    <Input type="password" value="key_bc69ed16c81fa347d618b4763cb7" disabled />
                  </div>
                  <div className="grid gap-2">
                    <Label>Data Storage</Label>
                    <div className="flex items-center gap-4">
                      <Button variant="outline">Opt Out of Sensitive Data Storage</Button>
                      <Button variant="outline">Enable Transcription Formatting</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
