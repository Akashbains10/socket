
import { Route, Routes } from "react-router-dom";
import { routesGroups } from "./routes";

const structureRoutes = routesGroups?.flatMap(({ base, layout, ...group }) =>
    group.routes.map(({ path, element }) => ({
        path: base ? `/${base}/${path}` : path,
        element,
        layout
    }))
)

export const AppRoutes = () => {
    return (
        <Routes>
            {structureRoutes?.map(({ path, element, layout: Layout }, index) => {
                const wrappedElement = Layout ? <Layout>{element}</Layout> : element
                return <Route key={index} path={path} element={wrappedElement} />
            })}
        </Routes>
    )
}