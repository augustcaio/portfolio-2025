"use client";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  User,
  AtSign,
} from "lucide-react";
import { useState } from "react";
import PageTransition from "@/components/page-transition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage(
          "Mensagem enviada com sucesso! Entrarei em contato em breve."
        );

        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setStatusMessage(
          result.error || "Erro ao enviar mensagem. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setSubmitStatus("error");
      setStatusMessage(
        "Erro de conexão. Verifique sua internet e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "caioaugusto930@gmail.com",
      href: "mailto:caioaugusto930@gmail.com",
      description: "Envie um email direto",
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (81) 99695-6624",
      href: "https://wa.me/5581996956624",
      description: "Envie uma mensagem",
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "Recife, PE - Brasil",
      href: "#",
      description: "Disponível para projetos remotos",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Entre em Contato
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vamos conversar sobre seu próximo projeto! Estou sempre aberto a
              novas oportunidades e colaborações.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Informações de Contato */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Informações de Contato
                </h2>
                <p className="text-muted-foreground">
                  Escolha a forma mais conveniente para entrar em contato
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.title}>
                    <Card className="hover:shadow-xl transition-all duration-300 border-border bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <info.icon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-card-foreground mb-1">
                              {info.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {info.description}
                            </p>
                            <a
                              href={info.href}
                              target={
                                info.title === "Telefone" ? "_blank" : undefined
                              }
                              rel={
                                info.title === "Telefone"
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="text-card-foreground hover:text-foreground font-medium transition-colors"
                            >
                              {info.value}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Status de Disponibilidade */}
              <div>
                <Card className="border-border bg-muted">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">
                          Disponível para Projetos
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Respondo em até 24 horas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Formulário de Contato */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="lg:pt-[88px]"
            >
              <Card className="border-border bg-card hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-card-foreground">
                    Envie uma Mensagem
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Preencha o formulário abaixo e entrarei em contato o mais
                    breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="flex items-center space-x-2 text-foreground"
                      >
                        <User className="h-4 w-4" />
                        <span>Nome Completo</span>
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Digite seu nome completo"
                        className="h-12 border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-ring"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center space-x-2 text-foreground"
                      >
                        <AtSign className="h-4 w-4" />
                        <span>Email</span>
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                        className="h-12 border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-ring"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="flex items-center space-x-2 text-foreground"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Mensagem</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Conte-me sobre seu projeto, ideia ou proposta de colaboração..."
                        className="resize-none border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-ring"
                      />
                    </div>

                    <div>
                      <div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="rounded-full h-4 w-4 border-b-2 border-white mr-2 animate-spin"></div>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Enviar Mensagem
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Status de Envio */}
                    {submitStatus !== "idle" && (
                      <div
                        className={`text-center p-3 rounded-lg ${
                          submitStatus === "success"
                            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                            : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium ${
                            submitStatus === "success"
                              ? "text-green-700 dark:text-green-300"
                              : "text-red-700 dark:text-red-300"
                          }`}
                        >
                          {statusMessage}
                        </p>
                      </div>
                    )}

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        Seus dados estão seguros e não serão compartilhados
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
