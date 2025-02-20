
import { useState } from 'react';
import { Brain, Upload, Plus, Trash, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Knowledge() {
  const { toast } = useToast();
  const [knowledgeBaseName, setKnowledgeBaseName] = useState('');
  const [knowledgeBaseUrl, setKnowledgeBaseUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Brain className="w-8 h-8 text-purple-500" />
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
      </div>

      <div className="grid gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create Knowledge Base</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Knowledge Base Name</Label>
              <Input
                placeholder="Enter knowledge base name"
                value={knowledgeBaseName}
                onChange={(e) => setKnowledgeBaseName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Add URL</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter URL to scrape"
                  value={knowledgeBaseUrl}
                  onChange={(e) => setKnowledgeBaseUrl(e.target.value)}
                />
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add URL
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Upload Files</Label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>

            <Button className="mt-4">
              Create Knowledge Base
            </Button>
          </div>
        </Card>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Knowledge Bases</h2>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh All
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Company Documentation</h3>
                <p className="text-sm text-gray-500">Last updated: 2 hours ago</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Source
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>https://docs.company.com</span>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>product-manual.pdf</span>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
