import React from 'react';

const SceneEditor = ({
    activeObject,
    setActiveObject,
    objects = [],
    isEditorMode,
    setIsEditorMode,
    onExport
}) => {
    const [copied, setCopied] = React.useState(false);
    const [saved, setSaved] = React.useState(false);
    const [saveError, setSaveError] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [transformMode, setTransformMode] = React.useState('translate'); // 'translate' | 'rotate'

    console.log("[SceneEditor] Prop check:", { objectsCount: objects?.length, isEditorMode, activeObject, transformMode });
    console.log("[SceneEditor] React version:", React.version, "React instance:", React);

    if (!isEditorMode) {
        return (
            <div style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('recenter-camera'))}
                    style={{
                        padding: '10px 20px',
                        background: 'rgba(0, 200, 83, 0.85)',
                        color: 'white',
                        border: '1px solid #00E676',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        transition: 'all 0.2s ease',
                        backdropFilter: 'blur(5px)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    🎯 RECENTER
                </button>
                <button
                    onClick={() => setIsEditorMode(true)}
                    style={{
                        padding: '12px 24px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        color: '#FFD700',
                        border: '1px solid #FFD700',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        transition: 'all 0.2s ease',
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    ⚙️ OPEN EDITOR
                </button>
            </div>
        );
    }

    const handleCopy = () => {
        onExport();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = async () => {
        try {
            setSaveError(null);

            // Get experience ID from URL or context
            const experienceId = window.location.pathname.split('/').pop();

            const response = await fetch('/api/save-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    experienceId,
                    objects: objects.map(obj => ({
                        id: obj.id,
                        pos: obj.pos,
                        rot: obj.rot
                    }))
                })
            });

            const result = await response.json();

            if (response.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } else {
                setSaveError(result.error || 'Failed to save');
            }
        } catch (error) {
            console.error('Save error:', error);
            setSaveError(error.message);
        }
    };

    const selectedObj = objects.find(o => o.id === activeObject);

    // Communicate mode change to 3D Scene
    const updateMode = (mode) => {
        setTransformMode(mode);
        window.dispatchEvent(new CustomEvent('scene-editor-mode-change', { detail: { mode } }));
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '320px',
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(5, 5, 20, 0.98))',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            zIndex: 10000,
            fontFamily: 'Outfit, Inter, sans-serif',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            animation: 'slideUp 0.3s ease-out'
        }}>
            <style>
                {`
                    @keyframes slideUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .editor-item:hover { background: rgba(255, 215, 0, 0.1) !important; color: #FFD700 !important; }
                    .tab-btn { flex: 1; padding: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: #fff; cursor: pointer; font-size: 0.75rem; letter-spacing: 1px; transition: 0.2s; }
                    .tab-btn.active { background: #FFD700; color: #000; font-weight: bold; border-color: #FFD700; }
                    .tab-btn:first-child { border-radius: 8px 0 0 8px; }
                    .tab-btn:last-child { border-radius: 0 8px 8px 0; }
                `}
            </style>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#FFD700', fontSize: '1.1rem', letterSpacing: '1px', fontWeight: '800' }}>
                    SCENE EDITOR ({objects.length})
                </h3>
                <button
                    onClick={() => setIsEditorMode(false)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#ff4444', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    ✕
                </button>
            </div>

            {/* Mode Toggle */}
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <button className={`tab-btn ${transformMode === 'translate' ? 'active' : ''}`} onClick={() => updateMode('translate')}>MOVE</button>
                <button className={`tab-btn ${transformMode === 'rotate' ? 'active' : ''}`} onClick={() => updateMode('rotate')}>ROTATE</button>
            </div>

            <div style={{ marginBottom: '20px', position: 'relative' }}>
                <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Select Object to {transformMode === 'translate' ? 'Move' : 'Rotate'}
                </label>

                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,215,0,0.2)',
                        color: selectedObj ? '#FFD700' : 'white',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.95rem'
                    }}
                >
                    <span>{selectedObj ? selectedObj.name : 'Choose an object...'}</span>
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}>▾</span>
                </div>

                {isOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: '#1a1a2e',
                        border: '1px solid rgba(255,215,0,0.3)',
                        borderRadius: '8px',
                        marginTop: '5px',
                        zIndex: 10001,
                        maxHeight: '200px',
                        overflowY: 'auto',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                        <div
                            className="editor-item"
                            onClick={() => { setActiveObject(null); setIsOpen(false); }}
                            style={{ padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', transition: '0.2s' }}
                        >
                            None (Deactivate Gizmo)
                        </div>
                        {objects.map(obj => (
                            <div
                                key={obj.id}
                                className="editor-item"
                                onClick={() => { setActiveObject(obj.id); setIsOpen(false); }}
                                style={{
                                    padding: '12px 15px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    transition: '0.2s',
                                    color: activeObject === obj.id ? '#FFD700' : 'white',
                                    fontWeight: activeObject === obj.id ? 'bold' : 'normal'
                                }}
                            >
                                {obj.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedObj && (
                <>
                <div style={{
                    marginBottom: '20px',
                    padding: '15px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ fontSize: '0.8rem', marginBottom: '12px', color: '#aaa', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{transformMode.toUpperCase()} ({selectedObj.name})</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        {['x', 'y', 'z'].map((axis, i) => {
                            const isRot = transformMode === 'rotate';
                            const val = isRot ? (selectedObj.rot ? selectedObj.rot[i] : 0) : selectedObj.pos[i];

                            return (
                                <div key={axis}>
                                    <label style={{ fontSize: '0.65rem', color: '#666', display: 'block', marginBottom: '4px' }}>
                                        {axis.toUpperCase()}{isRot ? '°' : ''}
                                    </label>
                                    <input
                                        type="number"
                                        step={isRot ? "1" : "0.01"}
                                        value={val?.toFixed(isRot ? 1 : 3) || 0}
                                        onChange={(e) => {
                                            const newVal = parseFloat(e.target.value);
                                            if (!isNaN(newVal)) {
                                                const field = isRot ? 'rot' : 'pos';
                                                const currentArr = isRot ? (selectedObj.rot || [0, 0, 0]) : selectedObj.pos;
                                                const newArr = [...currentArr];
                                                newArr[i] = newVal;
                                                window.dispatchEvent(new CustomEvent('scene-editor-manual-update', {
                                                    detail: { id: selectedObj.id, [field]: newArr }
                                                }));
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#FFD700',
                                            padding: '5px',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            fontFamily: 'monospace'
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Targeted Position Update (Requested by User) */}
                <div style={{ marginBottom: '20px', padding: '0 15px' }}>
                    <button
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent('scene-editor-use-camera-pos', {
                                detail: { id: selectedObj.id }
                            }));
                        }}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'rgba(0, 200, 83, 0.95)',
                            color: 'white',
                            border: '1px solid #00E676',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '800',
                            boxShadow: '0 4px 15px rgba(0, 200, 83, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#00C853';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(0, 200, 83, 0.95)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.96)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        🎯 USE THIS POSITION
                    </button>
                    <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '8px', textAlign: 'center', fontWeight: '500' }}>
                        Snap "{selectedObj.name}" to your current camera position.
                    </p>
                </div>
            </>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={handleSave}
                        style={{
                            flex: 1,
                            padding: '14px',
                            background: saved ? 'linear-gradient(to right, #00C853, #00E676)' : 'linear-gradient(to right, #2196F3, #03A9F4)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: saved ? '0 4px 15px rgba(0, 200, 83, 0.4)' : '0 4px 15px rgba(33, 150, 243, 0.3)',
                            transition: 'all 0.3s'
                        }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        {saved ? '✓ SAVED TO CONFIG' : '💾 SAVE TO CONFIG'}
                    </button>

                    <button
                        onClick={handleCopy}
                        style={{
                            flex: 1,
                            padding: '14px',
                            background: 'linear-gradient(to right, #FFD700, #FFA500)',
                            color: 'black',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                            transition: 'transform 0.1s'
                        }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY SCENE CONFIG'}
                    </button>
                </div>

                {saveError && (
                    <div style={{
                        padding: '10px',
                        background: 'rgba(244, 67, 54, 0.1)',
                        border: '1px solid #F44336',
                        borderRadius: '6px',
                        color: '#F44336',
                        fontSize: '0.75rem',
                        textAlign: 'center'
                    }}>
                        ⚠️ {saveError}
                    </div>
                )}
            </div>

            <p style={{ fontSize: '0.7rem', marginTop: '20px', color: '#666', textAlign: 'center', lineHeight: '1.4' }}>
                Toggle <b>MOVE</b> or <b>ROTATE</b> mode. Click <b>SAVE TO CONFIG</b> to write changes directly, or <b>COPY</b> to manually update <code>sceneConfig.js</code>.
            </p>
        </div>
    );
};

export default SceneEditor;
