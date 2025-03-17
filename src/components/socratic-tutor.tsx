"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  X,
  MessageSquare,
  Brain,
  Send,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  HelpCircle,
  CornerDownRight,
  Lightbulb,
  Zap,
  BookOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface SuggestedQuestion {
  id: string;
  text: string;
}

interface SocraticTutorProps {
  lessonTitle?: string;
  lessonType?: string;
  courseSubject?: string;
  concepts?: string[];
}

export default function SocraticTutor({
  lessonTitle = "Introducción a los conceptos básicos",
  lessonType = "video",
  courseSubject = "Matemáticas",
  concepts = ["Ecuaciones cuadráticas", "Funciones", "Gráficas"],
}: SocraticTutorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [tutorThinking, setTutorThinking] = useState(false);
  const [initialGreetingSent, setInitialGreetingSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Suggested questions based on the lesson context
  const suggestedQuestions: SuggestedQuestion[] = [
    { id: "q1", text: `¿Puedes explicarme los ${concepts[0]} en términos simples?` },
    { id: "q2", text: `¿Cómo se relacionan ${concepts[0]} y ${concepts[1]}?` },
    { id: "q3", text: `¿Puedes darme un ejemplo práctico de ${concepts[2]}?` },
    { id: "q4", text: "¿Qué conceptos previos debo dominar para entender esta lección?" },
  ];

  // Socratic prompts for the tutor to use
  const socraticPrompts = [
    "¿Qué pasaría si cambiamos esta variable?",
    "¿Puedes identificar un patrón en estos ejemplos?",
    "¿Cómo aplicarías este concepto en una situación real?",
    "¿Qué preguntas te surgen después de ver esto?",
    "¿Qué similitudes y diferencias encuentras con lo que ya conoces?",
  ];

  useEffect(() => {
    // Auto-scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  useEffect(() => {
    // Send initial greeting after a short delay when opened
    if (isOpen && !initialGreetingSent) {
      const timer = setTimeout(() => {
        addMessage({
          id: Date.now().toString(),
          content: `¡Hola! Soy tu tutor de ${courseSubject}. Estoy aquí para ayudarte con "${lessonTitle}". ¿Tienes alguna pregunta sobre los conceptos que estás aprendiendo?`,
          role: "assistant",
          timestamp: new Date(),
        });
        setInitialGreetingSent(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialGreetingSent, courseSubject, lessonTitle]);

  // Add a message to the chat
  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setInput("");

    // Simulate thinking
    setTutorThinking(true);

    // This would eventually be replaced with a real call to the LLM
    setTimeout(() => {
      setTutorThinking(false);
      generateSocraticResponse(input);
    }, 1500);
  };

  // Generate a Socratic-style response
  const generateSocraticResponse = (userInput: string) => {
    // This is a placeholder. In production, this would be a call to the LLM
    const lowerInput = userInput.toLowerCase();
    
    let response = "";
    
    // Simple response generation based on keywords
    if (lowerInput.includes("explicar") || lowerInput.includes("entender")) {
      response = `Intentemos entender ${concepts[0]} paso a paso. ¿Qué entiendes actualmente sobre este tema? Esto me ayudará a guiarte mejor.`;
    } else if (lowerInput.includes("ejemplo")) {
      response = `Pensemos en un ejemplo juntos. Si tenemos una situación donde ${concepts[1]} se aplica, ¿cómo crees que podríamos resolverla?`;
    } else if (lowerInput.includes("relación") || lowerInput.includes("diferencia")) {
      response = `Interesante pregunta sobre la relación. ¿Qué similitudes y diferencias has notado entre ${concepts[0]} y ${concepts[1]} hasta ahora?`;
    } else if (lowerInput.includes("difícil") || lowerInput.includes("complicado")) {
      response = `A veces estos conceptos pueden parecer complicados. ¿Qué parte específicamente encuentras más difícil de entender?`;
    } else {
      // Default to a random Socratic prompt
      const randomPrompt = socraticPrompts[Math.floor(Math.random() * socraticPrompts.length)];
      response = `${randomPrompt} Pensemos juntos en esto relacionado con ${concepts[Math.floor(Math.random() * concepts.length)]}.`;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      role: "assistant",
      timestamp: new Date(),
    };
    
    addMessage(assistantMessage);
  };

  // Handle suggested question click
  const handleSuggestedQuestionClick = (question: string) => {
    setInput(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  // Toggle chat minimized/expanded
  const toggleMinimized = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  // Make chat draggable in the future

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Suggestion bubble that appears occasionally */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 max-w-[220px]"
          >
            <Card className="bg-card shadow-lg p-3 pr-8 rounded-lg rounded-br-none border border-primary/20 relative">
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                onClick={() => setIsOpen(true)}
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs">
                  ¿Necesitas ayuda entendiendo 
                  <span className="font-medium"> {concepts[0]}</span>?
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      <Button
        onClick={toggleChat}
        size="icon"
        className={cn(
          "rounded-full h-14 w-14 shadow-lg transition-all duration-300",
          isOpen ? "bg-card border border-primary hover:bg-card" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary" />
        ) : (
          <Brain className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-card rounded-lg border border-border shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-border flex items-center justify-between bg-card/90 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">IA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">Tutor Socrático</h3>
                  <p className="text-xs text-muted-foreground">{courseSubject}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={toggleMinimized}
                >
                  {isMinimized ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Chat body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="flex flex-col overflow-hidden"
                >
                  <div className="flex-1 p-4 overflow-y-auto h-80 border-b border-border">
                    {/* Context header */}
                    <div className="mb-4 bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <p className="text-xs font-medium">{lessonTitle}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {concepts.map((concept, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-primary/5 hover:bg-primary/10 text-xs"
                          >
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[85%] rounded-lg p-3",
                              message.role === "user"
                                ? "bg-primary/10 rounded-tr-none text-foreground"
                                : "bg-muted/50 rounded-tl-none"
                            )}
                          >
                            {message.role === "assistant" && (
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                    IA
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-medium">Tutor IA</span>
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs text-muted-foreground mt-1 text-right">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Thinking animation */}
                      {tutorThinking && (
                        <div className="flex justify-start">
                          <div className="bg-muted/50 rounded-lg rounded-tl-none p-3 max-w-[85%]">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                  IA
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">Tutor IA</span>
                            </div>
                            <div className="flex gap-1 items-center h-5">
                              <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                              <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                              <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Suggested questions */}
                  <AnimatePresence>
                    {showSuggestions && messages.length < 3 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 py-2 border-b border-border bg-muted/30"
                      >
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Zap className="h-3 w-3 text-primary" /> Preguntas sugeridas
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedQuestions.map((q) => (
                            <Badge
                              key={q.id}
                              variant="outline"
                              className="bg-card text-xs cursor-pointer hover:bg-primary/5 transition-colors"
                              onClick={() => handleSuggestedQuestionClick(q.text)}
                            >
                              {q.text}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input area */}
                  <div className="p-3">
                    <div className="flex gap-2 items-end">
                      <Textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 min-h-[42px] max-h-[120px] bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        className="h-[42px] px-3"
                        disabled={!input.trim() || tutorThinking}
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">
                        Método socrático: te guío con preguntas 
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 px-2 text-xs"
                        onClick={() => setShowSuggestions(!showSuggestions)}
                      >
                        {showSuggestions ? "Ocultar sugerencias" : "Mostrar sugerencias"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 