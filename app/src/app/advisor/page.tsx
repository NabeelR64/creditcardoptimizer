"use client";

import { useChat } from "ai/react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

export default function AdvisorPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm your CardCopilot Advisor. Where are you shopping, and what's the estimated amount? I'll tell you the best card to use from your portfolio.",
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-6 lg:p-8 max-w-[800px] mx-auto h-[calc(100vh-2rem)] flex flex-col page-enter">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          AI Advisor
        </h1>
        <p className="text-muted-foreground mt-1">
          Ask me how to maximize your rewards on any purchase.
        </p>
      </div>

      <Card className="glass-card border-border/30 flex-1 flex flex-col overflow-hidden min-h-0">
        <CardContent className="p-0 flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-accent/40 rounded-tl-sm"
                  }`}
                >
                  {m.content}
                </div>

                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-pulse">
                 <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-accent/40 rounded-tl-sm flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border/30 bg-background/50 backdrop-blur-md shrink-0">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 relative"
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="e.g., I'm buying a $150 flight on Delta..."
                className="pr-12 bg-accent/30 border-border/30 h-12 rounded-xl"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="absolute right-1 w-10 h-10 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
