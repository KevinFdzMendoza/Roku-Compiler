import { useState } from 'react'
import { HyperLinkItem } from './HyperLinkItem.jsx'
import clearIcon from "./static/images/clear-icon.svg"
import "./TerminalStyles.css"

export function Terminal() {
    // const [count, setCount] = useState(0)

    // mock data
    const text = '[INFO] Iniciando la aplicación Roku.\n[INFO] Conectando en la dirección IP 192.168.1.100...\n[INFO] Conexión exitosa al dispositivo Roku.\n[INFO] Cargando el canal: MiCanal\n[INFO] Canal cargado exitosamente.\n[DEBUG] Iniciando reproducción de contenido.\n[DEBUG] Reproduciendo video: "Ejemplo.mp4"\n[INFO] Video en reproducción: "Ejemplo.mp4"\n[DEBUG] Control remoto detectado. Esperando entrada del usuario.\n[PRESIONADO] Botón de reproducción/pausa presionado.\n[DEBUG] Video en pausa.\n[PRESIONADO] Botón de avance rápido presionado.\n[INFO] Avanzando 30 segundos.\n[PRESIONADO] Botón de detener presionado.\n[INFO] Deteniendo la reproducción de video.\n[INFO] Saliendo de la aplicación Roku.\n[INFO] Aplicación Roku finalizada con éxito.\n[ERROR] Error de compilación: Tratando de acceder a `atributo` de `invalid`\n[INFO] Saliendo de la aplicación Roku debido a errores de compilación.\nINFO] Aplicación Roku finalizada con errores.\n[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...[INFO] Conectando en la dirección IP 192.168.1.100...'
    const buttonAttributes = {
        "iconClassName": "terminal-deleteButton-icon",
        "icon": clearIcon,
        "textClassName": "terminal-deleteButton-noText",
        "text": null
    }

    return (
        <div className='terminal'>
            <textarea className="terminal-textArea" readOnly rows="1" cols="30" defaultValue={text} />

            <div className='terminal-deleteButton'>
                <HyperLinkItem>
                    {buttonAttributes}
                </HyperLinkItem>
            </div>
        </div>
    )
}
