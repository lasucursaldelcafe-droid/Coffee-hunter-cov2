"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MarketplaceProductCard } from "@/components/MarketplaceProductCard";
import type { MarketplaceProduct } from "@/lib/marketplace/types";
import {
  getQuizRecommendations,
  getRecommendedCollectionSlug,
  quizQuestions,
  type QuizAnswers,
} from "@/lib/marketplace/quiz";

type AnswerKey = keyof QuizAnswers;

const initialAnswers: Partial<QuizAnswers> = {};

export function CoffeeQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(initialAnswers);
  const [finished, setFinished] = useState(false);
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json() as Promise<{ products: MarketplaceProduct[] }>)
      .then((data) => setProducts(data.products ?? []))
      .finally(() => setLoading(false));
  }, []);

  const currentQuestion = quizQuestions[step];
  const isLastStep = step === quizQuestions.length - 1;

  const handleSelect = (key: AnswerKey, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (isLastStep) {
      setFinished(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (finished) {
      setFinished(false);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const handleRestart = () => {
    setAnswers(initialAnswers);
    setStep(0);
    setFinished(false);
  };

  if (loading) {
    return <p className="text-center text-trade-muted py-16">Cargando catálogo...</p>;
  }

  if (finished && isCompleteAnswers(answers)) {
    const recommendations = getQuizRecommendations(products, answers);
    const collectionSlug = getRecommendedCollectionSlug(answers);

    return (
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-trade-ink mb-3">
            Tu selección personalizada
          </h2>
          <p className="text-trade-muted">
            Basado en tu perfil de comprador, estos son los cafés que mejor encajan contigo.
          </p>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {recommendations.map(({ product, reasons }) => (
              <div key={product.id} className="space-y-3">
                <MarketplaceProductCard product={product} />
                {reasons.length > 0 && (
                  <ul className="text-xs text-trade-muted px-2 space-y-1">
                    {reasons.slice(0, 2).map((r) => (
                      <li key={r}>✓ {r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center trade-card p-10">
            <p className="text-trade-muted mb-6">
              No encontramos coincidencias exactas. Explora nuestras colecciones curadas.
            </p>
            <Link
              href={`/catalogo/coleccion/${collectionSlug}`}
              className="btn-trade btn-trade-primary btn-trade-pill px-6 py-3"
            >
              Ver colección recomendada
            </Link>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href={`/catalogo/coleccion/${collectionSlug}`}
            className="btn-trade btn-trade-secondary btn-trade-pill px-6 py-3"
          >
            Explorar colección relacionada
          </Link>
          <button
            type="button"
            onClick={handleRestart}
            className="btn-trade btn-trade-secondary btn-trade-pill px-6 py-3"
          >
            Reiniciar quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-medium text-trade-muted">
          Pregunta {step + 1} de {quizQuestions.length}
        </span>
        <div className="flex gap-1">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i <= step ? "bg-green" : "bg-black/10"
              }`}
            />
          ))}
        </div>
      </div>

      <h2 className="font-display text-2xl sm:text-3xl font-bold text-trade-ink mb-8">
        {currentQuestion.title}
      </h2>

      <div className="space-y-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(currentQuestion.id, option.value)}
            className="w-full text-left trade-card p-5 hover:border-green/40 transition-colors group"
          >
            <span className="block font-semibold text-coffee group-hover:text-green transition-colors">
              {option.label}
            </span>
            <span className="block text-sm text-trade-muted mt-1">{option.desc}</span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="mt-6 text-sm font-medium text-trade-muted hover:text-coffee transition-colors"
        >
          ← Atrás
        </button>
      )}
    </div>
  );
}

function isCompleteAnswers(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  return (
    typeof answers.role === "string" &&
    typeof answers.volume === "string" &&
    typeof answers.coffeeType === "string" &&
    typeof answers.origin === "string" &&
    typeof answers.budget === "string"
  );
}
