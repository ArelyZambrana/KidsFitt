import React from 'react';
import { Card, Field } from '../components';

/** Recetario. Solo visual. Conecta: Persona 3 con GET /api/recipes?q=&category=&maxCalories=&minProtein= */
export default function RecipesView({ recipes, filters = {}, onFilters }) {
  return (
    <>
      <h1>Recetas saludables</h1>
      <Card>
        <div className="row">
          <Field label="Buscar"><input placeholder="nombre o ingrediente" defaultValue={filters.q} onChange={(e) => onFilters?.({ ...filters, q: e.target.value })} /></Field>
          <Field label="Categoría"><select defaultValue={filters.category}><option value="">Todas</option><option>desayuno</option><option>merienda</option><option>almuerzo</option></select></Field>
          <Field label="Máx. kcal"><input type="number" min="0" /></Field>
          <Field label="Mín. proteína (g)"><input type="number" min="0" /></Field>
        </div>
      </Card>
      {recipes.length === 0 && <p className="muted">No hay recetas con esos filtros.</p>}
      {recipes.map((r) => (
        <Card key={r.id} className="recipe">
          <details>
            <summary>{r.title} · {r.calories} kcal · {r.proteinGrams} g de proteína · <span className="muted">{r.category}</span></summary>
            <p>{r.description}</p>
            <h3>Ingredientes</h3><ul>{r.ingredients.map((i) => <li key={i}>{i}</li>)}</ul>
            <h3>Preparación</h3><ol>{r.instructions.map((i) => <li key={i}>{i}</li>)}</ol>
          </details>
        </Card>
      ))}
    </>
  );
}
