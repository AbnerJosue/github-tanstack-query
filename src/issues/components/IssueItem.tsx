import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { IGithubIssues, State } from '../interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';
import { timeSince } from '../../helpers';

interface IProps {
  issue: IGithubIssues;
}

/**
 * IssueItem
 *
 * Renderiza una fila de issue con:
 * - Icono de estado (abierto/cerrado)
 * - Título con navegación al detalle
 * - Metadatos (número, autor, antigüedad)
 * - Avatar del autor
 * - Contador de comentarios
 *
 * Además, aplica dos optimizaciones de cache con React Query:
 * 1) `presetData`: Inyecta en cache la data parcial (la del listado) para respuesta inmediata
 * 2) `prefetchData`: Hace fetch "en segundo plano" del issue y sus comentarios para que la vista de detalle
 *    cargue sin spinners cuando el usuario navegue
 */
export const IssueItem = ({ issue }: IProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /**
   * prefetchData
   *
   * - Objetivo: precargar en el caché de React Query datos que aún no se han mostrado.
   * - Qué hace:
   *   a) Prefetch del issue (detalles completos)
   *   b) Prefetch de los comentarios del issue
   *
   * Beneficio: cuando el usuario haga clic y navegue al detalle, la data ya estará en caché
   * y la UI podrá renderizar al instante (menos o ningún loading).
   *
   * Notas:
   * - `staleTime` = 60s: la data se considera "fresh" por un minuto; evita refetch inmediato.
   * - `retry` en comentarios: si falla, intenta 2 veces más.
   */
  const prefetchData = () => {
    // Prefetch del issue (detalles)
    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60,
    });

    // Prefetch de comentarios del issue
    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number, 'comments'],
      queryFn: () => getIssueComments(issue.number),
      staleTime: 1000 * 60,
      retry: 2,
    });
  };

  /**
   * presetData
   *
   * - Objetivo: "sembrar" manualmente en el caché la información que ya tenemos
   *   (la del listado) para que la vista de detalle no empiece en blanco.
   *
   * Qué hace:
   * - setQueryData con la key ['issues', issue.number] usando el objeto `issue` recibido por props
   * - Marca `updatedAt` a ahora + 60s para considerarlo fresco y evitar refetch inmediato
   *
   * Beneficio: experiencia instantánea; la UI puede mostrar data inmediata mientras
   * React Query resuelve (o ya resolvió) los detalles completos en segundo plano.
   */
  const presetData = () => {
    queryClient.setQueryData(
      ['issues', issue.number],
      issue,
      {
        // Considera "fresh" por 60s (coincide con staleTime del prefetch)
        updatedAt: Date.now() + 1000 * 60,
      }
    );
  };

  /**
   * handleHover
   *
   * Combina preset + prefetch al pasar el mouse:
   * - presetData: respuesta inmediata con lo que ya tienes
   * - prefetchData: rellena el caché con datos completos/actualizados
   *
   * Si prefieres no prefetch en hover (para reducir tráfico), puedes:
   * - Llamar solo a presetData aquí
   * - O mover prefetchData a onFocus/onPointerEnter/antes de navegar
   */
  const handleHover = () => {
    presetData();
    prefetchData();
  };

  return (
    <div
      onMouseEnter={handleHover}
      className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {/* Icono según estado del issue */}
      {issue.state === State.Close
        ? <FiInfo size={30} color="red" className="min-w-10" />
        : <FiCheckCircle size={30} color="green" />
      }

      {/* Contenido principal: título + metadatos */}
      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline cursor-pointer"
        >
          {issue.title}
        </a>

        {/* Nota: el "opened 2 days ago" está hardcodeado; puedes reemplazarlo con una función que calcule el tiempo real */}
        <span className="text-gray-500">
          #{issue.number} opened { timeSince(issue.created_at) }
          <span className="font-bold">{issue.user.login}</span>
        </span>
        <div className='flex flex-wrap'>
          {
            issue.labels.map((label) => (
              <span
                key={label.id}
                className='px-2 py-2 mr-2 text-xs text-white rounded-md'
                style={{
                  border: `1px solid #${label.color}`
                }}
              >
                {label.name}
              </span>
            ))
          }
        </div>
      </div>


      {/* Avatar del autor */}
      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
        loading="lazy"
        decoding="async"
      />

      {/* Bloque de comentarios */}
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">
          {issue.comments}
        </span>
      </div>
    </div>
  );
};
