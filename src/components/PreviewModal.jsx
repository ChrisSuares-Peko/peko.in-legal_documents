import React, { useEffect, useRef, useState, useCallback } from 'react';
import { C } from '../constants/colors';
import { CloseIcon, DownloadIcon, ZoomInIcon, ZoomOutIcon, ResetZoomIcon } from './Icons';

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.25;

function UseTemplateButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 18px',
        borderRadius: 10,
        border: `1.5px solid ${C.border}`,
        background: C.cardBg,
        fontSize: 13,
        fontWeight: 600,
        color: C.text,
        cursor: 'pointer',
        opacity: hovered ? 0.88 : 1,
        transition: 'all 0.15s',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      Use Template
    </button>
  );
}

function DownloadButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 18px',
        borderRadius: 10,
        border: 'none',
        background: C.redGrad,
        boxShadow: '0 2px 8px rgba(200,40,40,0.25)',
        fontSize: 13,
        fontWeight: 600,
        color: '#fff',
        cursor: 'pointer',
        opacity: hovered ? 0.88 : 1,
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      <DownloadIcon c="#fff" s={14} />
      Download
    </button>
  );
}

function ZoomToolbarButton({ onClick, children, title }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 30,
        height: 30,
        borderRadius: 7,
        border: 'none',
        background: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

export default function PreviewModal({ docName, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const zoomIn = () => setZoom(z => Math.min(+(z + ZOOM_STEP).toFixed(2), ZOOM_MAX));
  const zoomOut = () => setZoom(z => Math.max(+(z - ZOOM_STEP).toFixed(2), ZOOM_MIN));
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const onWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoom(z => Math.min(Math.max(+(z + delta).toFixed(2), ZOOM_MIN), ZOOM_MAX));
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    dragRef.current = { startX: e.clientX - pan.x, startY: e.clientY - pan.y };
    e.preventDefault();
  };

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current) return;
    setPan({ x: e.clientX - dragRef.current.startX, y: e.clientY - dragRef.current.startY });
  }, []);

  const onMouseUp = useCallback(() => { dragRef.current = null; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const isDragging = !!dragRef.current;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,26,26,0.45)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 620,
          maxWidth: '92vw',
          borderRadius: 20,
          background: C.cardBg,
          boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '18px 20px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
              Document Preview
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Legal Template</div>
          </div>
          <CloseButton onClose={onClose} />
        </div>

        {/* Preview body */}
        <div
          ref={previewRef}
          onMouseDown={onMouseDown}
          style={{
            height: 380,
            background: '#2C2C2A',
            position: 'relative',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          {/* Zoom toolbar */}
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(0,0,0,0.45)',
            borderRadius: 10,
            padding: '4px 6px',
            backdropFilter: 'blur(6px)',
          }}>
            <ZoomToolbarButton onClick={(e) => { e.stopPropagation(); zoomOut(); }} title="Zoom out">
              <ZoomOutIcon c="#D0D0D0" s={15} />
            </ZoomToolbarButton>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#C0C0C0',
              minWidth: 36,
              textAlign: 'center',
              fontFamily: 'inherit',
            }}>
              {Math.round(zoom * 100)}%
            </span>
            <ZoomToolbarButton onClick={(e) => { e.stopPropagation(); zoomIn(); }} title="Zoom in">
              <ZoomInIcon c="#D0D0D0" s={15} />
            </ZoomToolbarButton>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)', margin: '0 2px' }} />
            <ZoomToolbarButton onClick={(e) => { e.stopPropagation(); resetView(); }} title="Reset view">
              <ResetZoomIcon c="#D0D0D0" s={15} />
            </ZoomToolbarButton>
          </div>

          {/* Zoomable / pannable content */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: dragRef.current ? 'none' : 'transform 0.1s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}>
              <span style={{ fontSize: 40, lineHeight: 1 }}>📄</span>
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#C0C0C0',
                fontSize: 13,
                borderRadius: 8,
                padding: '8px 18px',
                whiteSpace: 'nowrap',
              }}>
                No preview available
              </div>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderTop: `1px solid ${C.border}`,
          gap: 12,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.text,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {docName}
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
              DOC · Legal Template
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <UseTemplateButton />
            <DownloadButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function CloseButton({ onClose }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: 'none',
        background: C.subtle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        transition: 'all 0.15s',
        opacity: hovered ? 0.88 : 1,
        flexShrink: 0,
      }}
    >
      <CloseIcon c={C.muted} s={16} />
    </button>
  );
}
